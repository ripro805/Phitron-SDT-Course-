def main():
    n = int(input())
    
    if n == 1:
        print(0)
        return
    elif n == 2:
        print(1)
        return

    fib = [0] * (n + 1)
    fib[1] = 0
    fib[2] = 1

    for i in range(3, n + 1):
        fib[i] = fib[i - 1] + fib[i - 2]

    print(fib[n])

if __name__ == "__main__":
    main()
