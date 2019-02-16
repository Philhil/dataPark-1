@echo on
pushd contract && truffle compile && truffle migrate --reset && popd && pushd website && node server && start http://localhost:3000/ popd
pause