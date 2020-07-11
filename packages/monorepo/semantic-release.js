const { MonoRepo } = require('./src')

let monoRepo

module.exports = {
  async verifyConditions (pluginConfig, context) {
    monoRepo = new MonoRepo({
      rootDir: context.cwd
    })

    await monoRepo.configureWorkspace({
      dryRun: pluginConfig.dryRun
    })
  },

  async prepare (pluginConfig, context) {
    const {
      nextRelease: { version }
    } = context

    await monoRepo.newVersion({ version })
    await monoRepo.buildWorkspace()
    await monoRepo.commitChanges({ version })
  },

  async publish (pluginConfig) {
    return monoRepo.publish({ dryRun: pluginConfig.dryRun })
  },

  async success (pluginConfig) {
    if (!pluginConfig.dryRun) {
      return monoRepo.syncRepository()
    }
  }
}