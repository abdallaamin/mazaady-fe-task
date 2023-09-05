import React from 'react'
import useSwr from 'swr'
import fetcher from '../lib/fetcher';


const useCat = () => {
    const url = 'https://staging.mazaady.com/api/v1/get_all_cats';

    const { data, error, isLoading } = useSwr(url, fetcher);

    return {
        data,
        error,
        isLoading,
    }
}

export default useCat