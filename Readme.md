# cabal-outdated-action

Just run the cabal outdated command.

```yaml
name: 'nightly dependencies check'

on:
  schedule:
    - cron: "00 15 * * *"

jobs:
  deps-check:
    runs-on: ubuntu-latest
    steps:
      - uses: waddlaw/cabal-outdated-action@main
```