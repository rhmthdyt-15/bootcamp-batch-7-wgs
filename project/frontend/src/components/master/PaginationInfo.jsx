import React from 'react'

const PaginationInfo = ({ rows, page, pages }) => {
    return (
        <div className="relative space-x-2">
            <p className="text-gray-600 text-sm mt-3">
                Total Rows: {rows} | Page: {rows ? page + 1 : 0} of {pages}
            </p>
        </div>
    )
}

export default PaginationInfo
