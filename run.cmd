@echo on
cd contract && truffle compile && truffle migrate --reset && cd.. && cd website && node server && start http://localhost:3000/
pause