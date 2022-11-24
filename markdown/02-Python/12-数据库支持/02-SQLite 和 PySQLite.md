# SQLite 和 PySQLite

## 连接

<div class="run"></div>

```python3
import sqlite3

conn = sqlite3.connect('tmp.db')
curs = conn.cursor()
print(curs)

conn.commit()
conn.close()
```
