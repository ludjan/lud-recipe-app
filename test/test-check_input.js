import assert from 'assert';
import rewire from 'rewire';

const file = rewire('./public/js/check_input.cjs');

describe('test-check_input.js', () => {
    
    const isAlphaNumeric = file.__get__('isAlphaNumeric');
    describe('#isAlphaNumeric()', function () {
        it('should allow letters', () => {
            const str = 'hei';
            assert.ok(isAlphaNumeric(str));
        });
        it('should allow numbers', () => {
            const str = '98764';
            assert.ok(isAlphaNumeric(str));
        });
        it('should allow whitespace', () => {
            const str = ' ';
            assert.ok(isAlphaNumeric(str));
        });
        it('should allow common special characters', () => {
            const str = '.,#@`';
            assert.ok(isAlphaNumeric(str));
        });
        it('should not allow empty string', () => {
            const str = '';
            assert.ok(!isAlphaNumeric(str));
        });
    });

    const isNumeric = file.__get__('isNumeric');
    describe('#isNumeric()', () => {
        it('should allow numbers', () => {
            const str = '1234567890'
            assert.ok(isNumeric(str))
        })
        it('should not allow empty string', () => {
            const str = ''
            assert.ok(!isNumeric(str))
        })
    })
    
    const isBlank = file.__get__('isBlank');
    describe('#isBlank()', () => {
        it('should return true on blank', () => {
            const str = ''
            assert.ok(isBlank(str))
        })
        it('should return false on not blank', () => {
            const str = '1234567890asdfg asd'
            assert.ok(!isBlank(str))
        })
    })
    
    const isNotBlank = file.__get__('isNotBlank');
    describe('#isNotBlank()', () => {
        it('should return false on blank', () => {
            const str = ''
            assert.ok(!isNotBlank(str))
        })
        it('should return true on not blank', () => {
            const str = '1234567890asdfg asd'
            assert.ok(isNotBlank(str))
        })
    })
    
});