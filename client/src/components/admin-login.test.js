const { testo } = require('./admin-login');
const { AdminLogin } = require('./admin-login');


test('should error handle no username', () => {
    const testFunction = testo('jack', 'haemish');
    expect(testFunction).toBe('jack is in love with haemish');
});


test('login function called', () => {
    const testFunction = AdminLogin.adminLogin();
    expect(testFunction).toHaveBeenCalled();
});

