# Ch6~Ch7 Notes：防禦型複製、不可變性

---

## 前言：TBD

- 為什麼面試要考淺拷貝和深拷貝？
- 以 React 為例，不變性關聯到畫面更新（Reconciliation）
  - 外部資料更新 -> 複製資料 -> 重新產生 Virtual DOM -> 更新 UI
- 不變性有助於避免意外修改資料：運算資源 vs 做錯事的風險 之間的權衡

---

## 🧱 1. 淺拷貝（Shallow Copy）

- **定義**：僅複製物件的第一層屬性，若屬性為參考型別（如物件或陣列），則新物件與原物件共享這些參考。

- **特性**：

  - 第一層屬性為基本型別時，值會被複製。
  - 巢狀物件或陣列仍指向相同的記憶體位置。([Roya's Blog][1])

- **常見方法**：

  - `Object.assign({}, obj)`
  - `{ ...obj }`（展開運算子）
  - `Array.prototype.slice()`
  - `Array.prototype.concat()`([Medium][2], [MDN Web Docs][3])
  - `cloneStructure()` -- 適用於較新的瀏覽器([Can I use][5])

- **範例**：

  ```javascript
  const original = { a: 1, b: { c: 2 } };
  const shallowCopy = { ...original };
  shallowCopy.b.c = 3;
  console.log(original.b.c); // 輸出：3，原物件被影響
  ```

---

## 🧱 2. 深拷貝（Deep Copy）

- **定義**：遞迴地複製物件的所有層級，確保新物件與原物件完全獨立，修改新物件不會影響原物件。([Roya's Blog][1])

- **特性**：

  - 所有層級的屬性都被複製。
  - 新物件與原物件不共享任何參考。

- **常見方法**：

  - `structuredClone(obj)`（現代瀏覽器支援）
  - `JSON.parse(JSON.stringify(obj))`（不支援函式、`undefined`、`Symbol` 等）
  - 第三方函式庫，如 Lodash 的 `cloneDeep()`([Medium][2])

- **範例**：

  ```javascript
  const original = { a: 1, b: { c: 2 } };
  const deepCopy = structuredClone(original);
  deepCopy.b.c = 3;
  console.log(original.b.c); // 輸出：2，原物件未被影響
  ```

---

## 🛡️ 3. 防禦型複製（Defensive Copy）

- **定義**：在提供物件給外部使用時，先複製一份，避免外部對該物件的修改影響到原始資料。([城市碼農][4])

- **應用情境**：

  - 原則一：資料離開安全區時需複製
  - 原則二：資料進入安全區時需複製

- **範例**：

  ```javascript
  class Person {
    constructor(name, hobbies) {
      this.name = name;
      this.hobbies = [...hobbies]; // 防禦型複製
    }

    getHobbies() {
      return [...this.hobbies]; // 防禦型複製
    }
  }

  const hobbies = ['reading', 'coding'];
  const person = new Person('Alex', hobbies);
  const retrievedHobbies = person.getHobbies();
  retrievedHobbies.push('gaming');
  console.log(person.getHobbies()); // 輸出：['reading', 'coding']
  ```

---

## ✍️ 4. 寫入時複製（Copy-on-Write）

- **定義**：在需要修改資料時，先複製一份資料，再進行修改，確保原始資料不被改動。

- **應用情境**：

  - 不可變資料結構（Immutable Data Structures）。
  - 狀態管理（如 Redux）中，避免直接修改原始狀態。

- **範例**：

  ```javascript
  const originalArray = [1, 2, 3];
  const newArray = [...originalArray];
  newArray.push(4);
  console.log(originalArray); // 輸出：[1, 2, 3]
  console.log(newArray); // 輸出：[1, 2, 3, 4]
  ```

---

## 🧾 概念比較表

| 概念       | 定義                                                         | 是否複製巢狀資料 | 是否保護原始資料 | 常見用途                       |     |
| ---------- | ------------------------------------------------------------ | ---------------- | ---------------- | ------------------------------ | --- |
| 淺拷貝     | 僅複製第一層屬性，巢狀物件仍共享參考。                       | 否               | 否               | 簡單資料結構的快速複製。       |     |
| 深拷貝     | 遞迴複製所有層級，完全獨立的新物件。                         | 是               | 是               | 複雜資料結構的安全複製。       |     |
| 防禦型複製 | 在提供資料給外部時，先複製一份，防止外部修改影響原始資料。   | 視需求而定       | 是               | API 設計、類別封裝、資料保護。 |     |
| 寫入時複製 | 在需要修改資料時，先複製一份，再進行修改，避免改動原始資料。 | 視需求而定       | 是               | 不可變資料結構、狀態管理。     |     |

---

[1]: https://awdr74100.github.io/2019-10-24-javascript-deepcopy/?utm_source=chatgpt.com "JavaScript 淺拷貝(Shallow Copy) 與深拷貝(Deep Copy) | Roya's Blog"
[2]: https://medium.com/version-1/cloning-an-object-in-javascript-shallow-copy-vs-deep-copy-fa8acd6681e9?utm_source=chatgpt.com 'Cloning an Object in Javascript: Shallow Copy vs. Deep Copy'
[3]: https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy?utm_source=chatgpt.com 'Deep copy - MDN Web Docs Glossary: Definitions of Web-related ...'
[4]: https://www.programfarmer.com/articles/2021/javascript-shallow-copy-deep-copy?utm_source=chatgpt.com 'JS 中的淺拷貝(Shallow copy) 與深拷貝(Deep copy) 原理與實作'
[5]: https://caniuse.com/?search=structuredClone 'Can I use -- structuredClone'
