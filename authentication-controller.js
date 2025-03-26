const authenticationService = require('./authentication-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { passwordMatched } = require('../../../utils/password');

async function getUserDetails(request, response, next) {
  try {
    const users = await authenticationService.getUserDetails();

    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

async function getUserDetail(request, response, next) {
  try {
    const user = await authenticationService.getUserDetail(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
      return response.status(200).json (user); 
    }
} catch (error) {
  return next(error);
}
}

async function login(request, response, next) {
    try{
        const{email, password} = request.body;
        const user = await authenticationService.getUser(request.params.id);
        if (!user) {
          throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
        }    
        if (!email) {
            throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
        }
        if (!password) {
            throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password is required');
          }
        if (email !== user.email) {
          throw errorResponder(
            errorTypes.INVALID_CREDENTIALS,
            'error response status 403'
          );
        }
        if (password !== user.password) {
            throw errorResponder(
              errorTypes.INVALID_PASSWORD,
              'error response status 403'
            );
          }
        const success = await authenticationService.login(
          request.params.id,
          email,
        );
        if (!success) {
            throw errorResponder(
              errorTypes.UNPROCESSABLE_ENTITY,
              'Failed to login'
            );
          }
        return response.status(200).json({ message: 'logged in successfully' });
    }
    catch (error){
        return next(error);
    }
}

module.exports = {
    getUserDetails,
    getUserDetail,
    login,
};
