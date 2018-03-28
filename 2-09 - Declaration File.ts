/*
  Definition files are files that contain no executable code, just definitions of things using the 'declare' keyword.

  They are used to make the compiler and your IDE/editor aware of things defined outside of their knowledge,
  such as it being code that's already been converted to JavaScript, or has always been JavaScript.

  These files can be hand crafted, or you can add the 'declaration' flag to 'jsconfig.json', or pass to the command,
  which will generate a file for your project when it is compiled.

  The NPM ecosystem has come together around a single open-source repository for definitions of packages.
  The TypeScript compiler will automatically check for definitions installed from here.
  Some IDEs will automatically use definitions installed from this repository for code-completion & analysis.
  * https://www.npmjs.com/~types
  * https://github.com/DefinitelyTyped/DefinitelyTyped
 */

/*
  In this example, I've run 'npm install' with 'bcrypt' and '@types/bcrypt'.
  The 'bcrypt' distributable is pure JS.
  The '@types/bcrypt' package is an accompanying definition file to annotate 'bcrypt'.
 */
import bcrypt from 'bcrypt';

// Show code-completion of bcrypt here.

