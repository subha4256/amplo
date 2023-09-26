import React from "react";
import { ToDoWrapper } from "./todoListStyling";
import moment from "moment";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ToDoWrapper className="col-sm-6 col-lg-3">
        <div className="card todo-sec mb-3">
          <div className="card-body ">
            <h5>To Do</h5>
            {this.props.todoList && (
              <div className="to-do-list">
                <div className="card card-accent-warning mb-2">
                  <div className="card-body">
                    <p className="to-do-list-p">In Progress</p>
                    {this.props.todoList?this.props.todoList.inProgress.map(todo => [
                      <p>{todo.DashboardTODOTaskDescription}</p>,
                      <p className="to-do-list-p1"> Check it Out</p>,
                      <p></p>
                    ]):null}
                  </div>
                </div>

                <div className="card card-accent-danger mb-2">
                  <div className="card-body">
                    <p className="to-do-list-p">Not Started</p>
                    {this.props.todoList?this.props.todoList.notStarted.map(todo => [
                      <p>{todo.DashboardTODOTaskDescription}</p>,
                      <p className="to-do-list-p1"> Start</p>,
                      <p></p>
                    ]):null}
                  </div>
                </div>

                <div className="card card-accent-secondary">
                  <div className="card-body">
                    <p className="to-do-list-p">Completed</p>
                    {this.props.todoList?this.props.todoList.completed.map(todo => [
                      <p>{todo.DashboardTODOTaskDescription}</p>
                    ]):null}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <!-- EVENTS SECTION START--> */}
        <div className="card event-sec">
          <div className="card-body ">
            <h5>Register for Event</h5>
            <div className="event-class">
              Save 10% on a <span>Design Thinking workshop</span> with the esteemed Amplo Global Inc. team with
              Promo Code
            </div>

            <button className="btn btn-lg btn-primary text-center webinar-button" type="button">Show Offer</button>
          </div>
        </div>
        {/* <!----   /row---> */}
      </ToDoWrapper>
    );
  }
}
