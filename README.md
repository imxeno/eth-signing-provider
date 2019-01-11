# eth-signing-provider

## GET /api/v1/info
example response:
```
{
  "success": true,
  "address": "0x5E802cec19C37D7cb19A1B11c4f90f7BC07C3684",
  "balance": "199914912000000000",
  "whitelist": [
    "0xe6C8E039a81360bd40933D95a4D23ABD544306B2"
  ],
  "network": 3
}
```

## POST /api/v1/sign
example request:
```
{
  "to": "0xe6C8E039a81360bd40933D95a4D23ABD544306B2",
  "data": "0xdeadc0de"
}
```
example response:
```
{
  "success": true,
  "txid": "0xe9683b883ef3f88b866746ad84c6509efadb793d52c8252e3e666909adedfe18"
}
```
