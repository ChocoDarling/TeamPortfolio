function getTheaterChairs(theaterId, number, time) {
    const tempData = getDB('theaterChairs', 'theaterId', theaterId, true);
    if (tempData === 'no Data') return initResInfo({ theaterId: theaterId, time: time, number: number });
    else {
        const findChiars = tempData.find(e => {
            if (
                parseInt(e.theaterId) === parseInt(theaterId) &&
                parseInt(e.number) === parseInt(number) &&
                e.time === time
            ) return true;
        });
        if (findChiars) return getChairsLength(findChiars.chairs);
        return initResInfo({ theaterId: theaterId, time: time, number: number });
    }
}

function initResInfo(object) {
    const tempTheater = getDB(TABLE.THERTERINFO, THERTERINFO.ID, object.theaterId, true)[0];
    
    object['name'] = tempTheater.name;
    object['chairs'] = JSON.stringify(JSON.parse(tempTheater.chairs)[parseInt(object.number) - 1]);
    initDB('theaterChairs', object);
    return getChairsLength(object.chairs);
}

function getChairsLength(arr) {
    return arr.toString().match(/1/g).length;
}

// 주소 보낼 때 html 뒤에 #theater=1&number=2&time=13:30 << 붙일것