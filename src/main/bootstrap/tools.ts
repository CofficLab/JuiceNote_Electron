function getCost(startAt: number) {
    return ((new Date().getTime()) - startAt) + 'ms'
}

export {
    getCost
}