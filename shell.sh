#!/bin/bash/
## This is the main shell file from now
time=5s
lang=$1
filename=$2
inputfile=$3
outputfile=$4
echo $lang
echo $filename
echo $inputfile
echo $outputfile
 #for java programs
if [ $lang == "java" ]
then
    javafile=$filename".java";
    javac $javafile  2> $outputfile                                #compile
    if [ $? = "0" ]; then
        cat $inputfile | timeout $time java $filename > $outputfile 2> $outputfile    #execute
        if [ $? = "124" ]; then 
            echo "Time limit exceeded" > $outputfile;
        fi
    fi
    rm -f $javafile $filename".class" $inputfile
#for python programs
elif [ $lang == "python" ]  
then 
    pythonfile=$filename".py";
    cat $inputfile | timeout $time Python $pythonfile > $outputfile 2> $outputfile  #execute
    if [ $? = "124" ]; then 
        echo "Time limit exceeded" > $outputfile;
    fi
    rm -f $pythonfile $inputfile
#for C programs
elif [ $lang == "c" ] 
then 
    cfile=$filename".c";
    gcc -o $filename $cfile  2> $outputfile                                  #compile
    if [ $? = "0" ]; then
    cat $inputfile | timeout $time ./C > $outputfile 2> $outputfile 2> $outputfile    #execute
        if [ $? = "124" ]; then 
            echo "Time limit exceeded" > $outputfile;
        fi
    fi
    rm -f $cfile $filename."exe" $inputfile
#for C++ programs
elif [ $lang == "cpp" ] 
then 
    cppfile=$filename".cpp"
    g++ -o $filename $cppfile  2> $outputfile                                 #compile
    if [ $? = "0" ]; then
    cat $inputfile | timeout $time ./Cpp > $outputfile 2> $outputfile 2> $outputfile    #execute
        if [ $? = "124" ]; then 
            echo "Time limit exceeded" > $outputfile;
        fi
    fi
    rm -f $cppfile $filename."exe" $inputfile
fi