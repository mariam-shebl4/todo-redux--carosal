import { Box } from '@mui/material'
import React from 'react'
import { Hourglass } from 'react-loader-spinner'

const Loader = () => {
    return (
        <Box sx={{ position: 'absolute', top: '55%', left: '50%', transform: "translate(-50%,-50%)" }}>
            <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#9c27b0', '#ca3be3']}
            />
        </Box>
    )
}

export default Loader