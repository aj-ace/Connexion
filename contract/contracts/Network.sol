pragma solidity ^0.5.0;

contract Network {
   // username selection
    mapping (address => bool) public set;

    mapping (address => string) public user;

    string[] public username;

    event SetUsernameEvent(string _name);
    
    event FindUsernameEvent(string _name);
    // ----------

    // All blogs
    struct Blog {
        string name;
        string content;
    }

    mapping (uint => Blog) public blogs;

    uint public numOptions;

    event NewBlogAdded(string _content);
    // ----------

    // All mails
    struct Mail {
        string from;
        string to;
        string subject;
        string content;
    }

    mapping (uint => Mail) public mails;

    uint public num;

    event NewMailAdded(string _content);
    // ----------


    constructor () public {   
    }

    function setusername(string memory _name) public {
        require(!set[msg.sender], "already set username");

        for(uint i=0; i<username.length; i++){
            require(keccak256(abi.encodePacked(username[i])) != keccak256(abi.encodePacked(_name)), "username taken");
        }

        set[msg.sender] = true;
        user[msg.sender] = _name;
        username.push(_name);
        emit SetUsernameEvent(_name);
    }

    function findusername(string memory _name) public {
        bool flag=true;
        for(uint i=0; i<username.length; i++){
            if(keccak256(abi.encodePacked(username[i])) == keccak256(abi.encodePacked(_name))){
                flag=true;
                break;
            } else{
                flag=false;
            }
        }
        if(flag==true){
            emit FindUsernameEvent(_name);
        } else{
            require(false, "no username found");
        }
    }

    function newBlog(string memory _content) public {
        require(set[msg.sender], "username not set");
        ++numOptions;
        blogs[numOptions].name = user[msg.sender];
        blogs[numOptions].content = _content;
        emit NewBlogAdded(_content);
    }

    function newMail(string memory _to, string memory _subject, string memory _content) public {
        require(set[msg.sender], "username not set");
        bool flag=true;
        for(uint i=0; i<username.length; i++){
            if(keccak256(abi.encodePacked(username[i])) == keccak256(abi.encodePacked(_to))){
                flag=true;
                break;
            } else{
                flag=false;
            }
        }
        if(flag==true){
            ++num;
            mails[num].from = user[msg.sender];
            mails[num].to = _to;
            mails[num].subject = _subject;
            mails[num].content = _content;
            emit NewMailAdded(_content);
        } else{
            require(false, "no username found");
        }
    }

}