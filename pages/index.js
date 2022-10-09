import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import { init } from './web3Client'
import quizyContract from '../blockchain/quizy'
import React from "react";




export default function Home() {
  // const providerUrl = process.env.PROVIDER_URL || 'http://localhost:8545'
  // useEffect(() => {
  //   init();
  // }, [])

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


  useEffect(() => {
    updateState()
  }, [lcContract])
  const updateState = () => {
    if (lcContract) getPot()
    if (lcContract) getPlayers()
    // if (lcContract) getLotteryId()
  }

  const addQuizAndGoNext = (x) => {
    arrStuTextAnswer.push(x)
    console.log(x)
    console.log(arrStuTextAnswer)
  }

  const addQuestAnsBeforeSubmit = (x, y) => {
    // const [arrTeacherQuestion, setArrTeacherQuestion] = useState([])
    // const [arrTeacherAnswer, setArrTeacherAnsewer] = useState([])
    console.log("This from add Quest Ans before submit")
    arrTeacherQuestion.push(x)
    arrTeacherAnswer.push(y)

    console.log("arrTeacherQuestion", arrTeacherQuestion)
    console.log("arrTeacherAnswer", arrTeacherAnswer)


  }

  // const [getArrAddressPlayer, setArrAddressPlayer] = useState([])
  const getArrPlayers = async () => {
    try {
      const players = await lcContract.methods.getArrayPlayers().call()
      // setArrAddressPlayer(players)
      console.log(players)
    } catch (err) {
      console.log(err)
    }
   


  }

  const [seeQuiz, setSeeQuiz] = useState()
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
      console.log(pot)
    } catch (err) {
      console.log(err)
    }
  }


  //get this contact balance
  const getPot = async () => {
    console.log("pot")
    const pot = await lcContract.methods.contractBalance().call()
    // setQuizyPot(pot / 1000000000000000000)
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
        gas: 200000,
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
        gas: 200000,
        gasPrice: null
      })
      console.log("success");

    } catch (err) {
      console.log(err.message);
    }
  }

  const doQuizHandler = async (x) => {
    try {
      const doQuiz = await lcContract.methods.doQuiz(x).send({
        from: address,
        // value: web3.utils.toWei('0.01', 'ether'),
        gas: 200000,
        gasPrice: null
      })
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
  const [numQuestion, setNumQuestion] = useState();
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
      await lcContract.methods.withdraw().send({
        from: address,
        // value: web3.utils.toWei('0.01', 'ether'),
        gas: 200000,
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
        gas: 200000,
        gasPrice: null
      })

    } catch (err) {
      console.log(err.message)
    }
    // await lcContract.methods.joinQuiz().call()
  }

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
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={getArrPlayers}>
        test get arr player
      </button>

      createArrPlayer

      <button onClick={() => arrPlayersHandler(0)}>
         arrPlayersHandler
      </button>

      {numQuestion} questions
      <button onClick={getNumberOfQuestions}>
        see num quest and detail
      </button>

      <button onClick={() => seeQuizHandler(0)}>
        seeQuizHandler
      </button>
      
      <button onClick={(quizCreatorHandler)}>
      quizCreatorHandler

      </button>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Quizzy.js! {address}</a>
          <button onClick={connectWalletHandler}>
            Connect Wallet
          </button>
          Players {players}
        </h1>

        <p className={styles.description}>
          hello{quizyPot} ETH
          <code className={styles.code}>pages/index.js</code>
        </p>




        {/* <p className={styles.description}>
          Players number {' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}

        {/* for teacher to submit their question */}
        <>
          setQuestion (teacher)
          <input onChange={(e) => setTextQuestion(e.currentTarget.value)}>
          </input>
          {/* <button onClick={() => console.log(textQuestion)}>
            showurrentText
          </button> */}


          setAnswer
          <input onChange={(e) => setTextAnswer(e.currentTarget.value)}>
          </input>

          {/* <button onClick={() => addQuestAnsBeforeSubmit(textQuestion, textAnswer)}>
            add quest and answer
          </button> */}

          {/* continue from here 3 15:40 */}

          
          <button onClick={(e) => addQuizhandler(textQuestion, textAnswer)}>
            add to blockchain
          </button>
        </>


        {/* for students to submit answer */}
        <>
          Let Answer (student)
          <input onChange={(e) => setStudentAns(e.currentTarget.value)} />
          <button onClick={() => addQuizAndGoNext(studentAns)}>
            next question
          </button>


          <button onClick={() => doQuizHandler(studentAns)}>
            submit answer doQuizHandler
          </button>
        </>


        <div>
          {
            (players.length > 0) && createArrPlayer.map(item => {
              return (<div>
                item
              </div>)

              }
            )
          }

        </div>


        <div className={styles.grid}>
          <a className={styles.card} onClick={() => addQuizhandler()}>
            <h2>Create Quizy &rarr;</h2>
            <p>Add Question to test understanding of student (Teacher only)
            </p>
          </a>

          <a className={styles.card} onClick={getNumberOfQuestions}>
            <h2>Get number of question &rarr;</h2>
            <p>Add Question to test understanding of student (both)
            </p>
          </a>

          <a className={styles.card} onClick={joinQuizHandler}>
            <h2>Join and Earn &rarr;</h2>
            <p>Let's answer the question, try your best and let get the reward! (Students)</p>
          </a>

          {/* <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a> */}

          {/* <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a> */}
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
