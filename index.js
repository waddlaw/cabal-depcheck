
import * as path from 'path';

const core = require('@actions/core');
const tool_cache = require('@actions/tool-cache');
const exec = require('@actions/exec');

const cabal_install_version = '3.2.0.0';
const cabal_install_linux_url = 'https://downloads.haskell.org/~cabal/cabal-install-' + cabal_install_version + '/cabal-install-' + cabal_install_version + '-x86_64-unknown-linux.tar.xz';
// const cabal_install_windows_url = '';
const cabal_install_macos_url = 'https://downloads.haskell.org/~cabal/cabal-install-' + cabal_install_version + '/cabal-install-' + cabal_install_version + '-x86_64-apple-darwin17.7.0.tar.xz';

const cabal_install_extracted_dir = '~/work/_temp/cabal/';

async function run() {
  try {

    // Download cabal-install executable
    var cabal_install_path;

    console.log(`download url: ${cabal_install_linux_url}`);

    // if (process.platform === 'win32') {
        // cabal_install_path = await tool_cache.downloadTool(cabal_install_windows_url);
    // }
    if (process.platform === 'darwin') {
        cabal_install_path = await tool_cache.downloadTool(cabal_install_macos_url);
    }
    else {
        cabal_install_path = await tool_cache.downloadTool(cabal_install_linux_url);
    }

    // decompress xz file
    await exec.exec('mkdir', cabal_install_extracted_dir);
    await exec.exec('tar', ['xf', cabal_install_path, '-C', cabal_install_extracted_dir]);

    const cabal_install_extracted_path = cabal_install_extracted_dir + 'cabal';

    // Cache cabal_install executable
    const cabal_install_cached_dir = await tool_cache.cacheFile(
        cabal_install_extracted_path,
        'cabal',
        'cabal',
        cabal_install_version
    );
    const cabal_install_cached_path = path.join(cabal_install_cached_dir, 'cabal');

    // Set mode
    await exec.exec('chmod', ['+x', cabal_install_cached_path], {silent: true});

    // Run cabal outdated
    await exec.exec(cabal_install_cached_path, ['--version']);
    await exec.exec(cabal_install_cached_path, 'update');
    await exec.exec(cabal_install_cached_path, ['outdated', '--exit-code']);

  } catch (error) {
    core.setFailed(`Action failed with error ${error}`);
  }
}

run();