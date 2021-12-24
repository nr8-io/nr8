# goals

helps you tell better stories about your code so it can be understood better
by humans and computers a-like

create platform wide structure from the start

start simple and allow the project to grow without as much growing pains

start as a simple service and develop into a platform

make use of different skill levels more effectively, allow less experienced developers
to contribute more to projects without as much hand holding and oversight and allow
experienced engineers and architects to spend more time where their value lies

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
