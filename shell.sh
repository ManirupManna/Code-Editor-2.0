#!/bin/bash/
time=1s
 #for java programs
if [ $1 == "java" ]
then
    javac Java.java  2> output.txt                                #compile
    if [ $? = "0" ]; then
        cat input.txt | timeout $time java Java > output.txt || echo "Time Limit Exceeded" > output.txt   #execute
    fi
#for python programs
elif [ $1 == "python" ]  
then 
    cat input.txt | timeout $time Python Python.py > output.txt 2> output.txt  #execute
    if [ $? = "124" ]; then 
        echo "Time limit exceeded" > output.txt;
    fi
#for C programs
elif [ $1 == "c" ] 
then 
    gcc -o C C.c  2> output.txt                                  #compile
    if [ $? = "0" ]; then
    cat input.txt | timeout $time ./C > output.txt  || echo "Time Limit Exceeded" > output.txt #execute
    fi
#for C++ programs
elif [ $1 == "cpp" ] 
then 
    g++ -o Cpp Cpp.cpp  2> output.txt                                 #compile
    if [ $? = "0" ]; then
    cat input.txt | timeout $time ./Cpp > output.txt  || echo "Time Limit Exceeded" > output.txt   #execute
    fi
fi