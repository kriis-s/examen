$ErrorActionPreference = "Stop"

$version = "8.14.2"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$tools = Join-Path $root "tools"
$gradleRoot = Join-Path $tools "gradle"
$zip = Join-Path $tools "gradle-$version-bin.zip"
$url = "https://services.gradle.org/distributions/gradle-$version-bin.zip"

New-Item -ItemType Directory -Force -Path $tools | Out-Null

if (-not (Test-Path -LiteralPath $zip)) {
  Invoke-WebRequest -Uri $url -OutFile $zip
}

if (Test-Path -LiteralPath $gradleRoot) {
  Remove-Item -LiteralPath $gradleRoot -Recurse -Force
}

Expand-Archive -LiteralPath $zip -DestinationPath $tools -Force
Move-Item -LiteralPath (Join-Path $tools "gradle-$version") -Destination $gradleRoot -Force

& (Join-Path $gradleRoot "bin\gradle.bat") --version
