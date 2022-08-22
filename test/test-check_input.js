import assert from 'assert';
import rewire from 'rewire';

const file = rewire('./public/js/check_input.cjs');

describe('test-check_input.js', () => {
    
    const isAlphaNumeric = file.__get__('isAlphaNumeric');
    describe('#isAlphaNumeric()', function () {
        it('should allow letters', () => {
            assert.ok(isAlphaNumeric('hei'));
        });
        it('should allow numbers', () => {
            assert.ok(isAlphaNumeric('98764'));
        });
        it('should allow whitespace', () => {
            assert.ok(isAlphaNumeric(' '));
        });
        it('should not allow common special characters', () => {
            assert.ok(!isAlphaNumeric('.,#@`'));
        });
        it('should not allow empty string', () => {
            assert.ok(!isAlphaNumeric(''));
        });
    });

    const isNumeric = file.__get__('isNumeric');
    describe('#isNumeric()', () => {
        it('should allow numbers', () => {
            assert.ok(isNumeric('1234567890'))
        })
        it('should not allow empty string', () => {
            assert.ok(!isNumeric(''))
        })
    })
    
    const isBlank = file.__get__('isBlank');
    describe('#isBlank()', () => {
        it('should return true on blank', () => {
            assert.ok(isBlank(''))
        })
        it('should return false on not blank', () => {
            assert.ok(!isBlank('1234567890asdfg asd'))
        })
    })
    
    const isNotBlank = file.__get__('isNotBlank');
    describe('#isNotBlank()', () => {
        it('should return false on blank', () => {
            assert.ok(!isNotBlank(''));
        });
        it('should return true on not blank', () => {
            assert.ok(isNotBlank('1234567890asdfg asd'));
        });
    });

    const containsSymbols = file.__get__('containsSymbols');
    describe('#containsSymbols()', () => {
        it('should return true if one symbol exists', () => {
            assert.ok(containsSymbols('abc', ['a']));
        })
        it('should return true if two symbols exists', () => {
            assert.ok(containsSymbols('abc!!', ['!']));
        });
        it('should return false if symbol does not exist', () => {
            assert.ok(!containsSymbols('abc', ['d']));
        })
        it('should return false if input str is empty', () => {
            assert.ok(!containsSymbols('', ['a']));
        })
        it('should return false if input symbols is empty', () => {
            assert.ok(!containsSymbols('abc', []));
        })
    })
    
    const containsBannedCharachters = file.__get__('containsBannedCharachters');
    describe('#containsBannedCharachters()', () => {
        it('should return true if str contains double quote', () => {
            assert.ok(containsBannedCharachters('Hei "Peter"'));
        })
        it('should return true if str contains backslash', () => {
            assert.ok(containsBannedCharachters('Dette er et backslash \\'));
        });
        it('should return true if str contains forwardslash', () => {
            assert.ok(containsBannedCharachters('Dette er et forwardslash /'));
        })
        it('should return true if str contains single quote', () => {
            assert.ok(containsBannedCharachters("Dette er et single quote '"));
        })
        it('should return true if str contains apostrophe', () => {
            assert.ok(containsBannedCharachters('Dette er en apostrofe`'));
        })
    })

});