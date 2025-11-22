def main():
    t = int(input())
    
    for _ in range(t):
        n = int(input())
        arr = list(map(int, input().split()))
        
        val = float('inf')
        
        for i in range(n):
            for j in range(i + 1, n):
                res = (arr[i] + arr[j]) + (j - i)
                val = min(val, res)
        
        print(val)

if __name__ == "__main__":
    main()
