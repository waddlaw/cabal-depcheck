# cabal-outdated-action

Just run the cabal outdated command.

## Usage

Save the following contents as `.github/workflows/outdated.yml`.

```yaml
name: 'dependencies check'

on:
  push:
    branches: [main]
  pull_request:
  schedule:
    - cron: "00 15 * * *"

jobs:
  outdated:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: waddlaw/cabal-outdated-action@main
```