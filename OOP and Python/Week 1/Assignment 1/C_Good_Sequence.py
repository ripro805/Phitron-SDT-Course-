def main():
    v = []
    n = int(input())
    v = list(map(int, input().split()))

    freq = [0] * (n + 1)

    for it in v:
        if it <= n:
            freq[it] += 1

    ans = 0

    for i in range(1, n + 1):
        if freq[i] != i:
            if freq[i] > i:
                ans += freq[i] - i
            else:  
                ans += freq[i]

    for it in v:
        if it > n:
            ans += 1

    print(ans)

if __name__ == "__main__":
    main()
