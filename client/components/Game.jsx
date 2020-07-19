import React from 'react'

import { connect } from 'react-redux'

import Writing from './Writing'
import Drawing from './Drawing'


class Game extends React.Component {

    state = {
        gameid: this.props.gameId,       //fix this later
        round: 1,
        done: false,
        finnished: [],
    }

    userfinnished = () => {

        this.setState({ done: true })
        socket.emit("imdone", this.state.gameid)
    }
    componentDidMount(){
        if(this.state.gameid == 0) this.props.history.push("/")
        socket.on("playerfinnished", res => {
            console.log(`user ${res} finnished`)
            this.setState({
                finnished: [...this.state.finnished, res]
            })
            if(this.props.players.length == this.state.finnished.length) {
                this.setState({
                    round: this.state.round + 1,
                    done: false,
                    finnished: [],
                })
            }
        })
    }

    
    render() {

        return (
            <>
              
                <h2>{`Your game: ${this.state.gameid}`}</h2>
                <center>
                    <div className="gamewrap">
                        {/* <p onClick={this.userfinnished}>simulate done</p> */}
                        <span><h1>{`Round ${this.state.round} ${((this.state.round % 2) == 1) ? "write" : "draw"}`}</h1></span>

                        <GameScreen isDone={this.state.done} currentRound={this.state.round} nowDone={this.userfinnished} />

                    </div>
                </center>
            </>
        )
    }
}

class GameScreen extends React.Component {
    render() {

      
        if (this.props.isDone) {
            return <div><h2>Your all done!</h2><p>waiting on other players</p></div>
        }

        if (this.props.currentRound === 1) {
            return <><h2>Write somthing for someone to draw</h2><input type="textbox" className="initalinput" placeholder="a dog with a trumpet"></input><div onClick={this.props.nowDone}>Done</div></>
        }


        return this.props.currentRound % 2 === 0
            ? <Drawing />
            : <Writing />
    }
}

const mapStateToProps = (state) => {
    return {
        players: state.players,
        gameId: state.game,
    }
}

export default connect(mapStateToProps)(Game)