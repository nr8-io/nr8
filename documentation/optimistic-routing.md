## optimistic routing (sticky sessions)
Allow for nr8 clients to execute new requests directly on the current service if 
that request could be handled by that service, requires the client library
to support optimistic routing where it would pull down some routing information from
the api so it can figure out what should happen to the request and if it can handle
the request locally instead of kicking it back to the gateway for distribution

If a request can be routed optimistically it would still be sent to the api server
but with metadata or status indicating it has already been routed so it is still
subject to logging and other controllers etc but would potentionally stop any create hooks
from being applied on requests which is something to think about, the client library could
still use hooks that are made for the api server on the client if but probably defeats
the purpose and should probably be a tool included from the gateway library

Optimistic routing would be useful in the case where local optimisations can be made
using in process caching while still using nr8 to create architecture and structure.

### use case
A service is dealing with parsing an xlsx file and one or more actions, events or queries
would take place in the narrative, parsing the file using existing libraries is an expensive
operation and creates language and process specific apis for reading and manipulating 
the files which makes memory stores like redis impractical for caching the operation between
requests in a distributed way.

If made without nr8 in mind the parsed xlsx api would be passed directly from one
method to another until the task is complete and would bypass the benefits of implementation
in nr8 which prevents the forming of a good narrative as the actions would have to be
simplified to support the implemenation, problems that nr8 could help solve such as architecture,
structure, testing, scaling, partial re-implementation, documentation, flow control etc
would be lost as the service becomes more complicated blackbox like requiring specific knowledge
from the developers with a general lack of platform structure to follow unless well planned
and well documented outside of the service which is unlikely.

If made in a functional way with the standard nr8 gateway requests concepts the xlsx
file would have to be parsed on each subsequent action in the narrative, whilst allowing
it to remain decentralised and scalable would include massive overheads that make it not worth using
or add caching complexity for the developers who would have to reimplement the existing library
to work more generically with a memory store like redis, memcached or even nr8 api objects
in order to perform each step efficiently, this would slow down development and is exactly
the kind of thing we are trying to avoid with nr8.

The ideal situation would be to allow the developers to assume each subsequent action
in the narrative could be handled by the same service so they can take advantage of
in process caching, the actions, events, and queriescan remain true to the narrative 
and provide all the future benefits they usually would but the local service handlers
would act more like local method calls instead removing most of the overhead associated
with using nr8 gateway and could easily be rerouted in future when the platform topology
changes without any additional work or thinking by the developers of the current service.

eg. so long as each request provides a file pointer as a param the service can lookup a
local cache and return the preparsed xlsx object api, if at some point the service is
split, a new service can do the same independently, for example maybe now the platform
has progressed and new features are required that mean rewriting the xlsx parsing library
is a good option, this can be done on a new service in parallel with legacy support on
the old service until it is ready to be switched off

WARNING
some thought still needs to be put into making sure the narrative remains predictable
when dealing with optimistic routing and local caching, special care should be taken
to still treat any locally cached data as read-only, mutating the cached data would break the
narrative if the same paramaters were used but the underlying data has changed,
each action should still remain functional and pass the required data on to the next step,
optimistic routing is only meant as a performance optmisation and the service should
function as intented with optimistic routing turned off, optimistic routing is only
intended to remove the transport overhead especially where large payloads are required.

eg. extract some information from the file and pass it on to the next step, each
step referencing the file and building on the previous to create new data to pass
on to the next step

doSomethingWithFile(filename='/path/to/file') |>
  doSomethingElse(extraData=$1, filename='/path/to/file') |>
  createNewFile(moreData=$1, filename='/path/to/file')
