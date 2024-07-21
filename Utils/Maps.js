import objectMapper from 'object-mapper';


const userMap = {
    '_id': 'id',
    'firstname': 'firstName',
    'lastname': 'lastName',
    'email': 'email',
    'role': 'role'
};

const mapUser = (user) => {
    if (Array.isArray(user)) {
        return user.map(u => objectMapper(u, userMap));
    }
    return objectMapper(user, userMap);
};

export default {
    mapUser
};
