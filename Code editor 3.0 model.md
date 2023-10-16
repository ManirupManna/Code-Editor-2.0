## Code Editor 
Coding Solution tester for given problems
### Architecture
#### Components:
1. Solution.java
2. Code_<user_id>.java
3. input_<user_id>.txt
4. output_<user_id>.txt
5. TestCases.txt (READONLY) -> for final submission
6. ExpectedOutput.txt(READONLY) -> for final submission
7. ProblemStatement.md
#### Steps:
1. user writes code in Code_<user_id>.java
2. user writes inputs to input_<user_id>.txt
3. user executes Code_<user_id>.java for testing and passes input_<user_id>.txt
4. user checks output_<user_id>.txt for checking the output for the inputs in input_<user_id>.txt
5. Now user wants to submit his/her code 
6. Code_<user_id>.java now runs against the inputs from TestCases.txt \
	6.1. if compile time error the user is displayed the compile time error \
	6.2. else continue to step 7
7. ExpectedOutput.txt contains all the expected outputs for the testcases in TestCases.txt
8. The contents of output_<user_id>.txt and ExpectedOutput.txt are compared \
	8.1. if both are matching then SUCCESS  \
	8.2 else FAILURE    \
	8.3 timeout TIME LIMIT EXCEEDED