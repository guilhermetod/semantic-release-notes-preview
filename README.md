<h1 align="center">Release Notes Preview</h1>
<p align="center">Generates and outputs a release notes preview</p>

# Usage

This actions uses [semantic-release](https://www.github.com/semantic-release/semantic-release) to generate a release notes preview.

In order to make semantic release work correctly, this actions must be run in the actual PR branch.
This means you'll need to run `@actions/checkout` with `fetch-depth: 0` so that we can get the PR branch.
After this, you must simply use this action. No inputs required.

The preview will then be logged in your workflow's runs, but you can also use the output of this action in further actions.

The example below shows how to add a comment to a pull request with the release preview.

```yaml
- name: Checkout repository
  uses: actions/checkout@v2
  with:
    fetch-depth: 0
- name: Generate release notes
  id: release-notes-preview
  uses: guilhermetod/semantic-release-notes-preview@v1.0.0
- name: Comment release notes preview
  uses: peter-evans/create-or-update-comment@v1
  with:
    issue-number: ${{ github.event.number }}
    body: |
    Thank you for you contribution. Below is a preview of the release notes if your PR gets merged.

    ---

    ${{ steps.release-notes-preview.outputs.releaseNotes }}
```

## License
This project is released under the [MIT License](https://github.com/guilhermetod/semantic-release-notes-preview/blob/main/LICENSE).
