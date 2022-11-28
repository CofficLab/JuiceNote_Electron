# SQLite

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

## 导入数据

<div class="run"></div>

```python3
import sqlite3

conn = sqlite3.connect('tmp.db')
curs = conn.cursor()

curs.execute('''
CREATE TABLE IF NOT EXISTS stuff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
)
''')
curs.execute('''
    INSERT INTO stuff (`name`) VALUES ('佟湘玉')
''')
curs.execute('''
    INSERT INTO stuff (`name`) VALUES ('莫小贝')
''')
conn.commit()
conn.close()
```

## 读取数据

<div class="run"></div>

```python3
import sqlite3

conn = sqlite3.connect('tmp.db')
curs = conn.cursor()

curs.execute('''
    SELECT * FROM stuff
''')

print(curs.fetchall())
```
