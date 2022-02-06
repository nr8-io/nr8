# goals

helps you tell better stories about your code so it can be understood better
by humans and computers a-like

create platform wide structure from the start

start simple and allow the project to grow without as much growing pains

start as a simple service and develop into a platform

make use of different skill levels more effectively, allow less experienced developers
to contribute more to projects without as much hand holding and oversight and allow
experienced engineers and architects to spend more time where their value lies

# metric ideas

metrics plugin could collect technical information like request counts, response times
failure rates etc to help identify problems on the platform, this could identify which
actions or queries need to be optmised or fixed.

a user metrics plugin would also be good for tracking progress, after api items are implemented
asking the developer about difficulty and other feedback would be useful for planning
future work and prompting scenario writers if needed, tracking some information about
the developers background could also help with future work assignments by letting us
distribute work more effectively without as much guess work. Cultural information as
used in the body of research "6 dimensions of culture" would likely help identify
the different kinds of work that are better suited to different groups or individuals
or better allocate tasks to encourage learning and growth by highlighting knowledge gaps
etc... asking the developer things like enjoyment level of the problem the solved etc
would also help keep a balance of satisfaction

assigning specific implementations at the api level would create the communication
pathways between developers who are working on intersecting scenarios and also
allow management to see and understand the communication overheads or complexities
and make changes as needed, also when new work is needed managers can more easily
see who might already have experience with similar tasks etc

peer review and QA can be built into the api by assigning roles like reviewer to encourage
team work and code reviews before the functions are put into production, managers or
architects could add quick notes on resources that would help solve the task and even
assign mentors for people who are involved in the project and may have specific knowledge
that could help.

This type of situation allows for harder tasks to be given to less experienced developers
for the sake of learning, time limits could be set with "back-up" develoeprs who
can step in when it is obvious the problem will not be solved by the person it is assigned
to.

# story telling

narrative

A tornado rips through Kansas, and Dorothy and her dog, Toto, are whisked away in their house to the magical land of Oz [context]. Dorothy must find her way home [problem]. She meets three friends, has lots of adventures, and eventually finds her way home [solution]. The three friends have problems too (no brain; no heart; no courage), which they solve along the way—stories within a story.

Context = Given
Problem = When
Solution = Then

# different translation sets

Different people might find different language easier to work with when thinking about writing a narrative
instead of trying to come up with the perfect taxonomy to fit everyone we could just provide different sets
for people to use depending on what works best for them, we could even mix and match based on their preferences
it also makes sense to provide slightly alternative translations to gherkin where appropriate eg. Features could also
be framed as Problems when considering a problem solving context over goal oriented context, and in saying that even
"Goal" could be used to replace Feature because feature is a high level organisation of scenarios it makes sense that
it could be worded differently, gherkin syntax allows for different translations so we could make additional english
translations eg en-problem, en-goal to make wording of the cucumber documents easier on the frontend users but also
perfectly consistent for other stake holders and implementors

In the "Problem" solving example, instead of given,when,then using context,problem,solution could help the users think
about that situation and there may be other situations where different language aids this, it might also be completely
different across age, gender, industry etc where different words to describe the basic pattern of context > problem > solution

Overall the narrative doesn't really care what words are used so long as it follows the pattern and for the sake of testing
and machine readablity the words are consistent

# context

setting the scene

Historical context - what happened to get to this state, what events happened before this if any
Physical context - what is the current situation

context should describe the characters, who is there, who will be acting in the context or doing things
context should also describe the "things" we know or "have" in the context, basically the different
constants in theory or physical
context may or may not have a location and the location may or may not be important, but given a lot
of software use cases the location is important context when designing a system because it helps
describe UI however it can also shift thinking forwards UI that might not be helpful
characters should be well developed and that is why they are a top level api object but I am
not sure about locations and if they need to be top level or just described in plain language
when needed

In saying that, if the "locations" are thought out before hand in a more general approach it might
help the building of UI and UX by thinking about the different places that need to exist to solve
a problem, in normal story telling the location is always important in setting the scene

Events could annotate contexts to show different things that happen or happened to establish
the context, this is a possible idea for scenario execution by creating event triggers for
scenario execution, eg. an executable scenario might have 3 even contexts that must be fullfilled
in order to execute, establishing that means when the api gateway notices this it can act
reactively and trigger a new scenario, the flow control can be defined at an api level
instead of programtically

# taxonomy

Topic/Category/Subject/Theme/Chapters/Sections - Organisation

High level organisation, provides documentation and order, can be mad pro-actively
or in retrospect, allowing different Features to be organised and moved around to
fit the narrative better, should help larger teams work together on bigger stories
by moving some topical responsibility where more appropriate. eg. software used in
a hispital might have different teams working on Medication, Patient Care, Administration
etc... each Topic has its own set of Features, Problems etc to solve but makes up
the broader narrative around interconnecting systems and scenarios, they help organise
things like chapters in a book or manual

Characters/Actors/Players - Context helpers

Helps establish context for Features/Problems by thinking about the different people
who will interact in the different cases, encourages stake holders to think about the
people who they will be interacting with, Characters don't have to be human either,
they just describe an entity that will be interacting in a context, this could be
a bot, external system or api but typically best to think about the human situation

Giving characters personal attributes will also help people relate to the chacaters better,
eg. a user whos role is "Administartor" if given the name "John" Will make the writers
feel more connected the situation, this can probably help developers keep a human
perspective when solving problems "given @John `the Administrator` is in the @Bathroom"

More personal attributes can allow us to give more descriptive stories as needed while
keeping the actual Gherkin docs simpler and provide loads of context to everyone involved
as needed

Background/Scenes/Situations/Settings - Context helpers

Helps to establish context for Features/Problems by thinking about the different locations
or scenes where things will take place, in an application this might describe an existing
or future location to be made, by desribing the scene the context could be established
quicker or to group common context items that don't change, these would set up kind of
standard rules for context that exist when solving problems. eg. if a location is mentioned
in context there may be a lot of assumptions by other writers or implementers about what
exists, in software that could be a "dashboard" or other common page name, if the writer
even provides a little more information about those scenes they can be annotated for others
to go and read later and the scene can be developed further as a better idea of what it is
used for evolves, it also helps stake holders consider what would happen if a scene was
removed from the story, what scenarios wouldn't work anymore and how much would have to
be rewritten in order to solve existing Features, problems and scenarios

Scenes would really just be annotations like characters that provide more backstory
as needed without having the writers go into details on every single scenario but allow
that deep back story to exist which might be important for other writers or implementors

Scenes could also be used in the Background for features to keep the background sections
shorter when reading over them or using the gherkin docs for testing etc... UI can easily
integrate this more by either making those expandable in place or linking the user to read
more about the scene, this would provide much better self documentation.

eg. If I want to use my narrative as at the documentation, and I want to specify a context
like "the software is already installed" and provide information of how it was already
installed that doesn't really make sense to solve in a Feature/problem etc, eg. it is
just documentation for the developers and doesn't really add to the narrative being solved
then scenes could be used to provide this kind of documentation

eg. for Topvine projects we can stipulate a background for all Features that they are
using our standard environment

Some scenes will be more important to developers than the writers and developers should
definitely contribute to the story so they can let other developers know about the context

Stake holders don't always know what this information would be, or lack the experience
to set the scene

One of the downsides of using Gherkin is that they are supposed to be kept pretty simple
in order to make them useful for testing, I agree that this is needed and that to develop
the story further it will be better to annotate the scenarios instead of making them
larger, scenes providers a good context for doing so

Scenes could also establish the characters/actors who are there

eg. Background: Given "John the administator"

Feature/Problem/Case/Matter/Trouble/Challenge

# Clients/Services (Consumers/Providers)

Clients (Consumer)

- can submit actions
- can subscribe to events
- one way communication
  client has to submit an action or subscribe to an event to recieve information
  from the gateway

clients would be real world users or api users that do not provide a service to
the gateway

Services (Provider)

- can do everything a client can
- has additional config for routing
- two way communication
  gateway can directly call services when needed

services provide handlers to the gateway and can be called by a router depending
on the rules so services have connection information for the gateway to use, eg.
https endpoint for triggering actions/events/queries

Clients/Services can be labled and router would match on labels to fulfill situations
like staging or canary feature releases.

eg. common staging scenario Client is labled with env: staging, when the client
sends a query the router will match the env and route to the correct service if it
exists. Providers should register one Service per environment and each deployment would
use the corresponding creds depending on its deployment env, the Service would be
labeled like the client to ensure interactions from the Provider only interact with
env: staging routers

instead of running two completely different stacks this gives some flexibility
on setting up multiple envs while running only one gateway, eg. demo, canary and
using the same site and urls, front ends could also use the client labels to decide
what UI to show and what not to show or what to load/not load

canary example might be enabling some features for specific users but not others
for testing, by labeling the user with a special key the gateway can direct certain
requests to canary services instead of production which could be mixed and matched
This is also a useful situation for staging and development where we want to maintain
one testing dataset and can run additional databases/services linked.

possible development workflow using user labels, a provider developer can create
a user labeled specifically for their development env and add routing rules to redirect
traffic to their service, this could be run locally or whatever the developer wants
so long as it is reachable by the gateway either by exposing a port or through a tunnel
etc... this could solve a big problem in projects where the developer has to run the
whole stack locally because having multiple people work on a hosted env causes conflicts
this method wouldn't have the same problems because the developer can redirect traffic
only for clients labeled to do so without interupting other developers, and other developers
could work with those developers by labeling their users to use their development service

with some smart micro frontend code the gateway could also handle redirecting where
frontends are loaded from, this would let local developers work specifically on the
frontend code they need to while making use or others code
