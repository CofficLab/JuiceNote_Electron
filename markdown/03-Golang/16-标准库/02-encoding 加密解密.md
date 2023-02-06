# `encoding` 加密解密

## base64

<div class="run"></div>

```go
package main

import (
    "encoding/base64"
    "fmt"
)

func main() {
    s := "hello world"
    sEncode := base64.StdEncoding.EncodeToString([]byte(s))
    fmt.Printf("encode(`hello world`) = %s\n", sEncode)

    sDecode, _ := base64.StdEncoding.DecodeString(sEncode)
    fmt.Printf("decode(`%s`) = %s\n", sEncode, sDecode)
}
```

## sha256

<div class="run"></div>

```go
package main

import (
    "crypto/sha256"
    "fmt"
)

func main() {
    s := "hello world"
    h := sha256.New()
    h.Write([]byte(s))
    res := h.Sum(nil)
    fmt.Printf("sha245(`hello world`) = %x\n", res)
}
```
