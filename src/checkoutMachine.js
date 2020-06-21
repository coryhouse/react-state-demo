import { Machine, assign } from "xstate";

export const checkoutMachine = Machine({
  id: "checkout", // identify the machine and set the base string for its child state node IDs
    initial: "idle", // initial machine state
    context: {
        city: '',
        retries: 0
  },
  states: {
    idle: {
      on: {
        SUBMIT: [
          {
            target: "editing.city.error.tooShort",
          },
          {
            target: "submitting",
          },
        ],
      },
      type: "parallel",
      states: {
        city: {
          initial: "valid",
          states: {
            valid: {},
            error: {},
          },
        },
      },
    },
    submitting: {
      on: {
        INVALID: "submitted",
        VALID: "completed",
      },
    },
    submitted: {
      on: {
        SUBMIT: "submitting",
      },
    },
    completed: {
      type: "final",
    },
    }, {
        actions: {
            cache: assign((context, event) => event),
            incrementRetry: assign((context, event) => context.retries + 1)
        },
        guards: {
            isCityEmpty: (context) => context.city.length === 0,
            isCityTooShort: (context) => context.city.length < 10
        }
  }
});
