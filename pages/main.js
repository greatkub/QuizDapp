import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import { init } from './web3Client'
import quizyContract from '../blockchain/quizy'
import React from "react";

export default function main() {

  const [web3, setWeb3] = useState()
  const [address, setAddress] = useState()


  const [lcContract, setLcContract] = useState()
  const [quizyPot, setQuizyPot] = useState()
  const [players, setPlayers] = useState(0)
  const [createArrPlayer, setCreateArrPlayer] = useState([])
  const [textQuestion, setTextQuestion] = useState("")
  const [textAnswer, setTextAnswer] = useState("")
  const [studentAns, setStudentAns] = useState("")
  // for student
  const [arrStuTextAnswer, setArrStuTextAnswer] = useState([])
  // for teacher
  const [arrTeacherQuestion, setArrTeacherQuestion] = useState([])
  const [arrTeacherAnswer, setArrTeacherAnsewer] = useState([])

  //both
  const [getArrAddressPlayer, setArrAddressPlayer] = useState([])



  useEffect(() => {
    const a = window.localStorage.getItem("address")
    if (a !== null) {
      setAddress(a)
    }
    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
      window.ethereum.on('accountsChanged', function (accounts) {
        window.localStorage.setItem("address", accounts[0])
        setAddress(accounts[0])
      })
    }
    // if (lcContract) getPot()
  })

  // useEffect(() => {
  //   if (lcContract) getPot()
  //   // if (lcContract) getPlayers()
  // }, [lcContract, quizyPot, players])
  const [numquest, setnumquest] = useState(0)

  useEffect(() => {
    updateState()
  }, [lcContract])
  const updateState = () => {
    if (lcContract) getPot()
    if (lcContract) getPlayers()
    if (lcContract) getNumberOfQuestions()
    // if (lcContract) seeQuizHandler(numquest)
    // if (lcContract) quizCreatorHandler
    // if (lcContract) getLotteryId()
  }







  // const [getArrAddressPlayer, setArrAddressPlayer] = useState([])
 

  const [seeQuiz, setSeeQuiz] = useState("Hello Quizzy!")
  const seeQuizHandler = async (num) => {
    try {
      const pot = await lcContract.methods.lookQuizs(num).call()
      console.log(pot)
      setSeeQuiz(pot)
    } catch (err) {
      console.log(err)
    }
    
  }

  //return Quiz creator
  const quizCreatorHandler = async () => {
    try {
      const pot = await lcContract.methods.getQuizCreator().call()
      console.log("This is quiz creator" + pot)
    } catch (err) {
      console.log(err)
    }
  }


  //get this contact balance
  const getPot = async () => {
    console.log("pot")
    const pot = await lcContract.methods.contractBalance().call()
    setQuizyPot(pot / 1000000000000000000)
  }

  //get Current number players 
  const getPlayers = async () => {
    const players = await lcContract.methods.retrievePlayerSize().call()
    setPlayers(players)
    console.log(players)
    if(createArrPlayer.length < players) {
      for(var i = 0; i < players; i++) {
        // createArrPlayer.push(arrPlayersHandler(i))
        console.log(arrPlayersHandler(i))
      }
    }

    console.log(createArrPlayer)
  }
  const arraa = useState([])
  const arrPlayersHandler = async (num) => {
    try {
      const players = await lcContract.methods.players(num).call()
      // console.log(players)
      arraa.push(players)
      console.log(arraa)

      // return(players)
    } catch (err) {
      console.log(err.message)
    }
  }

  /* get current question of the address */
  const getCurrentQuestionHandler = async () => {
    try {
      await lcContract.methods.getMyQuestion().send({
        from: address,
        // value: web3.utils.toWei('0.01', 'ether'),
        gas: 600000,
        gasPrice: null
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  /* get Current Question and Answer by number */

  // const [currentQuestAns, setCurrentQuestAns] = useState()
  // const getQuestbyNumAndAnswer = async (num) => {
  //   try {
  //     const a = await lcContract.methods.allQuestions(num).call()
  //     setCurrentQuestAns(a);
  //     console.log(a)
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

  /* not done*/
  // const [allQuestions, setAllQuestions] = useState([]);
  // const [allAnswers, setAllAnswers] = useState([]);

  // const getAllQuestionAndAnswerHandler = async () => {

  //   try {
  //     const allQuestAllAns = await lcContract.methods.retrieveAllQuestionAndAnswer().call()
  //     setAllQuestions(allQuestAllAns[0]);
  //     setAllAnswers(allQuestAllAns[1]);
  //     console.log(allQuestAllAns[0]);
  //     console.log(allQuestAllAns[1]);
  //     console.log(allQuestAllAns)

  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

  /* add quiz*/
  const [numQuiz, setNumQuiz] = useState()

  const addQuizhandler = async (x, y) => {
    try {
      const addQuizy = await lcContract.methods.addQuiz(x, y).send({
        from: address,
        // value: web3.utils.toWei('0.01', 'ether'),
        gas: 600000,
        gasPrice: null
      })
      console.log("success");

    } catch (err) {
      console.log(err.message);
    }
  }

  const doQuizHandler = async (x) => {

    setnumquest(numquest+1)
    seeQuizHandler(numquest)

    console.log(numquest)
    try {
      const doQuiz = await lcContract.methods.doQuiz(x).send({
        from: address,
        // value: web3.utils.toWei('0.01', 'ether'),
        gas: 600000,
        gasPrice: null
      })
      console.log("doquiz")
      console.log(doQuiz)

     
    } catch (err) {
      console.log(err.message)
    }
  }



  // const addQuizQuestion = async (quest, ans) => {
  //   console.log(quest)
  //   console.log(ans)
  //   try {
  //     await lcContract.methods.addQuiz(quest, ans).send({
  //       from: address,
  //       // value: web3.utils.toWei('0.01', 'ether'),
  //       gas: 300000,
  //       gasPrice: null
  //     })

  //   } catch (err) {
  //     console.log(err.message)
  //   }
  // }

  /* show question.length */
  const [numQuestion, setNumQuestion] = useState(0);
  const getNumberOfQuestions = async () => {
    try {
      const numOfQuestions = await lcContract.methods.quizSize().call()
      console.log(numOfQuestions);
      setNumQuestion(numOfQuestions);

    } catch (err) {
      console.log(err.message);
    }
  }



  //quiz creator -> quiz cretor is the first one who call the function in sol.
  const withdrawHandler = async () => {
    try {
        const x = await lcContract.methods.whoHighestScore().call()
        // setArrAddressPlayer(players)
        console.log(x)
      } catch (err) {
        console.log(err)
    }

    try {
      await lcContract.methods.withdraw().send({
        from: address,
        // value: web3.utils.toWei('0.01', 'ether'),
        gas: 600000,
        gasPrice: null
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  const joinQuizHandler = async () => {
    try {

      await lcContract.methods.joinQuiz().send({
        from: address,
        value: web3.utils.toWei('0.01', 'ether'),
        gas: 600000,
        gasPrice: null
      })

    } catch (err) {
      console.log(err.message)
    }
    // await lcContract.methods.joinQuiz().call()
  }

  //use
  const connectWalletHandler = async () => {
    // check if metamask is installed
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        //request wallet connection
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const web3 = new Web3(window.ethereum)

        setWeb3(web3)
        // get list of accounts
        const accounts = await web3.eth.getAccounts()
        window.localStorage.setItem('address', accounts[0]);
        setAddress(accounts[0])
        console.log(accounts[0])
        //Create Local Contract
        const lc = quizyContract(web3)
        // window.localStorage.setItem("lc", lc)
        setLcContract(lc)
      } catch (err) {
        console.log(err.message)
      }
    } else {
      //Metamask is not install
      console.log("Please install MetaMask")
    }
    // console.log(init())

  }
    return (
        <div>

            <div style={{ backgroundColor: "white", width: "100%", height: "10vh", position: 'relative' }}>
                <div style={{ postion: 'absolute', color: 'black', fontSize: '30px', fontWeight: 'bold' }}>
                    {address}
                </div>
                <button onClick={connectWalletHandler}>
                    Connect
                </button>
            </div>
            <div style={{ backgroundColor: "white", width: "100vw", height: "90vh", position: 'relative' }}>
                <div style={{ backgroundColor: 'red', width: "50%", height: "100%", position: 'absolute' }}>
                    <div style={{fontSize: 30, position: 'relative'}}>
                        <div>
                        (Teacher only!)
                        </div>
                        <div style={{position: 'absolute', right: 5, top: 0}}>
                        {numQuestion} questions 
                        </div>
                        
                    </div>
                    
                    <button onClick={withdrawHandler} style={{width: 150, height: 30, marginLeft: 20, marginTop: 10}}>
                        End Quizzy 
                    </button>
                    <div style={{ position: 'relative', width: "100%", height: "100%" }}>
                        <div style={{
                            position: 'absolute', margin: 'auto', width: '100%', height: "40%", top: 0, bottom: 0
                            , right: 0, left: 0, fontSize: '40px', textAlign: 'center'
                        }}>
                            <div>
                                Create Quiz 
                            </div>
                            
                            <div style={{width: "100%", height: "100%"}}>
                                <input style={{ width: "50%", height: "10%" }} placeholder="Write Your Question"
                                onChange={(e) => setTextQuestion(e.currentTarget.value)}>

                                </input>
                            </div>
                            <div style={{width: "100%", height: "100%", position: 'absolute', top: 100}}>
                                <input style={{ width: "50%", height: "10%" }} placeholder="Write Your Answer"
                                onChange={(e) => setTextAnswer(e.currentTarget.value)}>

                                </input>
                                <div>
                                    <button style={{width: "50%", height: "20%"}} 
                                    onClick={(e) => addQuizhandler(textQuestion, textAnswer)}>
                                        Add Quizy
                                    </button>
                                </div>
                            </div>
                           
                           
                           

                            


                        </div>

                    </div>
                </div>
                <div style={{ backgroundColor: 'blue', width: "50%", height: "100%", position: 'absolute', right: 0 }}>
                <div style={{fontSize: 30, position: 'relative'}}>
                        <div>
                        (Students only!)
                        </div>
                        <div style={{position: 'absolute', right: 5, top: 0}}>
                        {players} participants
                        </div>
                        <div style={{position: 'absolute', right: 5, top: 40}}>
                         Contract Balance {quizyPot} ETH
                        </div>
                        
                    </div>
                    <button onClick={joinQuizHandler} style={{width: 150, height: 30, marginLeft: 20, marginTop: 10}}>
                        Join Quizzy 
                    </button>
                    {/* <button onClick={quizCreatorHandler} style={{width: 150, height: 30, marginLeft: 20, marginTop: 10}}>
                    quizCreatorHandler

                    </button> */}
          
                    <div style={{ position: 'relative', width: "100%", height: "100%" }}>
                        <div style={{
                            position: 'absolute', margin: 'auto', width: '100%', height: "40%", top: 0, bottom: 0
                            , right: 0, left: 0, fontSize: '40px', textAlign: 'center'
                        }}>
                            {/* <div>
                                Create Quiz
                            </div> */}
                            
                            <div style={{width: "100%", height: "100%"}} >
                                {numquest+1}. {seeQuiz}
                            </div>
                            <div style={{width: "100%", height: "100%", position: 'absolute', top: 100}}>
                                <input style={{ width: "50%", height: "10%" }} placeholder="Write Your Answer"
                                onChange={(e) => setStudentAns(e.currentTarget.value)}>

                                </input>
                                <div>
                                    <button onClick={() => doQuizHandler(studentAns)} style={{width: "50%", height: "20%"}}>
                                        submit
                                    </button>
                                </div>
                            </div>
                           
                           
                           

                            


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}