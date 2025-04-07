# 導論

## 第 1 章 初識函數式程式概念

### Functional Programming 的定義

> "Functional programming is a style of programming in which functions are treated as first-class citizens, and higher-order functions are used to compose new functions from existing ones."

- Action（動作、操作或行為）=> Impure Function

  - 會隨著時間改變

- Calculations（計算、運算）=> Pure Function

  - 輸入相同、輸出相同
  - 計算或是決策有關，不會與環境互動
  - 適合用來測試
  - 例如：測試、計算

- Data（數據、資料）
  - 事件或是事實紀錄
  - 養成長期保留的習慣
  - 例如：資料庫、文件、檔案

## 第 2 章 實務中的函數式思維

### 分層設計

- 業務邏輯
- 領域層
- 技術層

### 頭等抽象化

> 假如現在餐廳有一個製作比薩的流程，我們可以將這個流程抽象化，

客人點餐 => 揉麵團 => 製作醬汁 => 擺上食材 => 煮烤 => 完成

### 頭等抽象化的瓶頸

> 假如現在有三個機器人，每個機器人負責不同的工作，

Robot A => 揉麵團
Robot B => 製作醬汁 => 擺上食材
Robot C => 煮烤

Robot B 需要等到 Robot A 完成，然後才能開始

如果沒有特別調整時間線，則會遇到需要互相等待的情況

### 設計模式

- 頭等抽象化
- 時間線分界

## 第 3 章 分辨 Actions、Calculations 與 Data(56)

| Actions                                       | Calculations           | Data                     |
| --------------------------------------------- | ---------------------- | ------------------------ |
| 會產生 Side Effect ，且受到執行時間或次數限制 | 透過運算將輸入轉為輸出 | 關於各事件的紀錄         |
| 也稱為額外作用函數、非純函數                  | 也稱為純函數、數學函數 |                          |
| 例子：傳送電子郵件                            | 例子：計算面積         | 例子：記錄使用者的 Email |

### Action（動作、操作或行為）

- 需要保存：Data
- 需要決策：Calculations
- 特別小心：Actions

### Data（保存 Domain 的資訊）

Data 需要保存 Domain 的資訊
e.g.: 防禦性複製、順序等

- 妥善保存的資訊可以保存很久
- 有可解釋性

### Action

- Function call(函數呼叫): alert()
- Method calls
- Constructors
