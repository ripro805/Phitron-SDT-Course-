def main():
    n = int(input())
    a = list(map(int, input().split()))
    
    min_index = 0
    max_index = 0
    
    for i in range(1, n):
        if a[i] < a[min_index]:
            min_index = i
        if a[i] > a[max_index]:
            max_index = i
    
    # Swap min and max
    a[min_index], a[max_index] = a[max_index], a[min_index]
    
    print(*a)

if __name__ == "__main__":
    main()
