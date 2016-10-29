module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            main: {
                src: [
                    'bower_components/Rusha/rusha.min.js',
                    'bower_components/long/dist/long.min.js',
                    'bower_components/big-int/src/BigInt.js',

                    'node_modules/zlibjs/bin/gunzip.min.js',

                    'src/vendor/jsbn/jsbn_combined.min.js',
                    'src/vendor/cryptoJS/crypto.min.js',

                    'src/js/lib/polyfill.js',
                    'src/js/lib/config.js',
                    'src/js/lib/utils.js',
                    'src/js/lib/bin_utils.js',
                    'src/js/lib/tl_utils.js',
                    
                    'src/helpers/Etc/Helper.js',
                    'src/helpers/Etc/qSync.js',
                    'src/helpers/Etc/Storage.js',
                    'src/helpers/Etc/CryptoWorker.js',
                    'src/helpers/Etc/IdleManager.js',
                    'src/helpers/Etc/TelegramMeWebService.js',
                    'src/helpers/Etc/NotificationsManager.js',
                    'src/helpers/Etc/FileManager.js',
                    'src/helpers/Etc/TmpfsFileStorage.js',
                    'src/helpers/Etc/IdbFileStorage.js',
                    'src/helpers/Etc/MemoryFileStorage.js',

                    'src/helpers/Mtp/MtpDcConfigurator.js',
                    'src/helpers/Mtp/MtpTimeManager.js',
                    'src/helpers/Mtp/MtpSecureRandom.js',
                    'src/helpers/Mtp/MtpRsaKeysManager.js',
                    'src/helpers/Mtp/MtpAuthorizer.js',
                    'src/helpers/Mtp/MtpNetworkerFactory.js',
                    'src/helpers/Mtp/MtpSingleInstanceService.js',
                    'src/helpers/Mtp/MtpApiManager.js',
                    'src/helpers/Mtp/MtpApiFileManager.js',

                    'src/helpers/App/AppPeersManager.js',
                    'src/helpers/App/AppChatsManager.js',
                    'src/helpers/App/AppUsersManager.js',
                    'src/helpers/App/AppProfileManager.js',

                    'src/telegramApi.js'
                ],
                dest: 'out/telegramApi-full.js'
            }
        },
        uglify: {
            main: {
                files: {
                    'out/telegramApi-full.min.js': ['out/telegramApi-full.js']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'out/',
                        src: [ '*.js' ],
                        dest: 'example/js/'
                    },
                    {
                        expand: true,
                        cwd: 'src/js/lib/',
                        src: [
                            'crypto_worker.js',
                            'polyfill.js',
                            'bin_utils.js'
                        ],
                        dest: 'example/js/lib/'
                    },
                    {
                        expand: true,
                        cwd: 'src/vendor',
                        src: [
                            'jsbn/jsbn_combined.min.js',
                            'cryptoJS/crypto.min.js',
                        ],
                        dest: 'example/js/lib/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components',
                        src: [
                            'long/dist/long.min.js',
                            'Rusha/rusha.min.js'
                        ],
                        dest: 'example/js/lib/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'src/nacl',
                        src: [ '**' ],
                        dest: 'example/nacl/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'example',
                        src: [
                            'js/**/*',
                            'nacl/**/*'
                        ],
                        dest: 'dist'
                    }
                ]
            }
        },
        clean: {
            js: ['example/js/**'],
            nacl: ['example/nacl/**'],
            dist: ['dist/**/*']
        },
        connect: {
            http: {
                options: {
                    open: 'http://localhost:8181',
                    base: 'example',
                    port: 8181,
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('build', [
        'clean',
        'concat',
        'uglify',
        'copy'
    ]);
};