import { useLoading } from "@/components/loading-provider"

export function useAppLoading() {
  const { isLoading, setIsLoading, showLoading, hideLoading } = useLoading()

  const withLoading = async <T>(
    asyncFunction: () => Promise<T>,
    message?: string
  ): Promise<T> => {
    try {
      showLoading(message)
      const result = await asyncFunction()
      return result
    } finally {
      hideLoading()
    }
  }

  return {
    isLoading,
    setIsLoading,
    showLoading,
    hideLoading,
    withLoading,
  }
} 