var graph   = require('../dist/index'),
    path    = require('path'),
    fs      = require('fs'),
    expect  = require('chai').expect,
    esprima = require('../vendor/esprima');

describe('graph', function () {
    it('parses source code correctly', function () {
        var dir = path.join(__dirname, 'assets/'),
            result = fs.readdirSync(dir)
                .map(function (file) {
                    return path.join(dir, file);
                })
                .filter(function (file) {
                    return fs.statSync(file).isFile();
                })
                .map(function (file) {
                    return graph(fs.readFileSync(file, 'utf8'));
                });

        expect(result)
            .to.deep.equal([
                {
                    imports: {
                        module2: ['foo'],
                        module3: ['default'],
                        module4: ['foo']
                    },
                    exports: [
                        'bar',
                        'baz',
                        'hello',
                        'asdf',
                        'qwer',
                        'default'
                    ]
                }
            ]);
    });
    it('deals with AST objects correctly', function () {
        var dir = path.join(__dirname, 'assets/'),
            result = fs.readdirSync(dir)
                .map(function (file) {
                    return path.join(dir, file);
                })
                .filter(function (file) {
                    return fs.statSync(file).isFile();
                })
                .map(function (file) {
                    return graph(esprima.parse(fs.readFileSync(file, 'utf8')));
                });

        expect(result)
            .to.deep.equal([
                {
                    imports: {
                        module2: ['foo'],
                        module3: ['default'],
                        module4: ['foo']
                    },
                    exports: [
                        'bar',
                        'baz',
                        'hello',
                        'asdf',
                        'qwer',
                        'default'
                    ]
                }
            ]);
    });
});
