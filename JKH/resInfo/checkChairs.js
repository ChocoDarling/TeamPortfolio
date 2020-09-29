function getTheaterChairs(mvId, theaterId, number, date, time) {
    const tempData = getDB('theaterChairs', 'theaterId', theaterId, true);
    console.log(tempData);
    console.log(mvId);
    console.log(theaterId);
    console.log(number);
    console.log(date);
    console.log(time);

    if (tempData === 'no Data') return initResInfo({ mvId: mvId, theaterId: theaterId, time: time, number: number, date: date });
    else {
        let findChiars;
        tempData.find(e => {
            if (
                e.mvId === mvId &&
                parseInt(e.theaterId) === parseInt(theaterId) &&
                parseInt(e.number) === parseInt(number) &&
                e.time === time &&
                e.date === date
            ) findChiars = e;
        });
        
        if (findChiars) return getChairsLength(findChiars.chairs);
        return initResInfo({ mvId: mvId, theaterId: theaterId, time: time, number: number, date: date });
    }
}

function initResInfo(object) {
    const tempTheater = getDB(TABLE.THERTERINFO, THERTERINFO.ID, object.theaterId, true)[0];
    object['id'] = getCount('theaterChairs') + 1;
    object['chairs'] = JSON.stringify(JSON.parse(tempTheater.chairs)[parseInt(object.number) - 1]);
    initDB('theaterChairs', object);
    return getChairsLength(object.chairs);
}

function getChairsLength(arr) {
    return arr.toString().match(/1/g).length;
}

// 주소 보낼 때 html 뒤에 #theater=1&number=2&time=13:30 << 붙일것