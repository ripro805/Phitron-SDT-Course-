def split_balanced(S):
    result = []
    count = 0  
    start = 0   

    for i, char in enumerate(S):
        if char == 'L':
            count += 1
        else:  
            count -= 1

        if count == 0:
            result.append(S[start:i+1])
            start = i+1

    print(len(result))
    for substr in result:
        print(substr)

S = input().strip()
split_balanced(S)
