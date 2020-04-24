import React from 'react';

export default ({ children, ...attrs }: React.HTMLAttributes<HTMLButtonElement>) => {
    return <button { ...attrs }>{children}</button>
}