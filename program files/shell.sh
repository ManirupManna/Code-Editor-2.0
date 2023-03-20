#!/bin/bash/
time=1s
 #for java programs
if [ $1 == "java" ]
then
    javac Java.java                                         #compile
    cat input.txt | timeout $time java Java > output.txt    #execute
#for python programs
elif [ $1 == "python" ]  
then 
    cat input.txt | timeout $time Python Python.py > output.txt #execute
#for C programs
elif [ $1 == "c" ] 
then 
    gcc -o C C.c                                    #compile
    cat input.txt | timeout $time ./C > output.txt  #execute
#for C++ programs
elif [ $1 == "cpp" ] 
then 
    g++ -o Cpp Cpp.cpp                                  #compile
    cat input.txt | timeout $time ./Cpp > output.txt    #execute
fi