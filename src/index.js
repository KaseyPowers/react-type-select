/*
input option structure:
// final used distinct/display value pairs
- type/badge
- value/label

// TODO: figure out how to allow the type/badge in the search field

// for options with children 
- options: array of children values, will inherit rules from parent
- getOptions: function that should return option(s). will have value filtering off by default (Async only)

// for options without preset value

  - label: function, will be called with input value to output display value, otherwise ignored

  // masking logic, will only run against options without value/label
  - mask: string with masking pattern
  - maskValues: object to describe any extra masking definitions (TODO: figure out how to define optional values if all ex. MM/DD/YYYY accepting 22334444)

  // Mask values structure
  key:  key is the character/string checked against the mask string. - for this example 'A' 
    { 
      - pattern: string or regex. If a string, checks if it includes the character. If a regex, will test character against it. 
      - placeholder: what is displayed when there isn't a character filled in for this yet, default '_'
      - optional: T/F (default F): if true, input can match the mask without including the character but will keep the placeholder in the final value
      (ex. input: "2342342345" with mask "(999) 999-9999" and "()-" getting optional True will result in "(234) 234-2345")
    }
    // default values
    A: {
      pattern: /\w/
    }
    9: {
      pattern: /\d/
    }
  - for any character in mask string not found in values will be treated as
  char: {
    pattern: char,
    placeholder: char
  }

  // validate is an object with rules defined
  // the key or individual parts of the object can be a function that takes the input string and returns the expected structure 
  validate: {
    key: { // key is used to overwrite rules (set to false to turn off for option)
      - valid: T/F // if false but show is true, will disable option.
      // TODO: perhaps a quick way to define new pattern rules? (ex. valid accepts string/regex to be treated like pattern, or a pattern key that will check against if valid is undefined)
      - show: T/F/String // determine if an option can be shown, if undefined use valid, if string, use it as default label
      - message: string // if invalid and shown, can display message next to option
    }
  }

  // predefined rules have a few ways to use 
  - within the validation object or in the option definition: (validation object will override definitions in the option? might consider merging ) 
    - key shorthand:  key: value/config
    - TODO: consider camel cased showKey as shorthand to allow key: {valid, show} from option object for rules that accept it

    // rules that accept {valid: value, show: value} structure
  - minLength/maxLength: compare values to the length of the string
  - pattern: uses regex to compare the input

  // rules with custom value/config structure
  - mask: defined above, but the final object only accepts { string, values } from {mask, maskValues} in option definition. 


// for options with predefined values
// TODO: determine if/how to validate this vs rules meant for searched values
- filter: if the default filter (value/label compared to input) will be used to validate. default true. getOptions will default children to false.


// could accept a function option equivalent to fn = { getOptions: fn}
// for options that are children and so can get passed in the required type, a string will be treated like str = { value: str}
*/

// NOTE: the getOptions logic will only work in Async
