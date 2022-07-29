module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: "7545",
            network_id: '*' // connect to any network
        },
        // contracts_directory: './src/contracts/',
        // contracts_build_directory: './src/truffle_abis',
        compilers: {
            solc: {
                version: '0.8.15',
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }
    },
}