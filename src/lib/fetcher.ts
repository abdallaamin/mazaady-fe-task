import axios from 'axios';

//'private-key': `B1+Di1@#C1{314@^XG1Uj%H1h%1@I2E@25@;`,


const fetcher = (url: string, ) =>
    axios
        .get(url, {
            headers: {
                'private-key': `B1+Di1@#C1{314@^XG1Uj%H1h%1@I2E@25@;`,
            },
        })
        .then((res) => res.data);

export default fetcher;
