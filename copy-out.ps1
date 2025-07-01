# Copia tudo da pasta out para o destino
xcopy out\* C:\react\blendidrop\afiliado_lomadee\comprar\ /E /I /Y

# Faz o replace nos HTMLs
Get-ChildItem -Path "C:\react\blendidrop\afiliado_lomadee\comprar" -Filter *.html -Recurse | ForEach-Object {
  (Get-Content $_.FullName) -replace '/_next/static/', '/comprar/_next/static/' | Set-Content $_.FullName
}