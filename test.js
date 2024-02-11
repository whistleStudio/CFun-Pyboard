/* 
stdout: Collecting numpy
  Using cached numpy-1.26.4-cp312-cp312-win_amd64.whl.metadata (61 kB)
Using cached numpy-1.26.4-cp312-cp312-win_amd64.whl (15.5 MB)
Installing collected packages: numpy
Successfully installed numpy-1.26.4
*/
const str = `stdout: Collecting numpy
Using cached numpy-1.26.4-cp312-cp312-win_amd64.whl.metadata (61 kB)
Using cached numpy-1.26.4-cp312-cp312-win_amd64.whl (15.5 MB)
Installing collected packages: numpy
Successfully installed numpy-1.26.4`
const re = /Successfully\s*installed\s*numpy/
console.log(re.test(str))
